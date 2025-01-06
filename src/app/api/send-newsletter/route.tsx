import { basehub } from "basehub";
import { authenticateWebhook } from "basehub/workflows";
import { getEvents } from "basehub/events";
import { Resend } from "resend";
import chunk from "lodash/chunk";
import { RichText } from "basehub/react-rich-text";

const resend = new Resend("re_RDJvGERe_4F7bUNWuNnJkictAXRddUCnG");

export const POST = async (request: Request) => {
  console.log("Newsletter sending process started");

  try {
    const data = await basehub().query({
      site: {
        footer: {
          newsletter: {
            submissions: { adminKey: true },
            sendNewsletter: { webhookSecret: true },
          },
        },
      },
    });
    console.log("Successfully fetched webhook configuration");

    const result = await authenticateWebhook({
      secret: data.site.footer.newsletter.sendNewsletter.webhookSecret,
      body: request.body,
      signature: request.headers,
    });

    if (!result.success) {
      console.error("Webhook authentication failed");
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("Webhook authenticated successfully");

    const dataEmails = await basehub().query({
      site: {
        footer: {
          newsletter: {
            emails: {
              __args: {
                filter: {
                  _sys_id: { eq: result.payload.data.blockId },
                },
              },
              item: {
                _title: true,
                body: { json: { content: true } },
              },
            },
          },
        },
      },
    });

    const email = dataEmails.site.footer.newsletter.emails.item;
    if (!email) {
      console.error("Email template not found for ID:", result.payload.data.blockId);
      return new Response("Email not found", { status: 404 });
    }
    console.log("Email template found:", email._title);

    const subscribersResponse = await getEvents(data.site.footer.newsletter.submissions.adminKey, {
      type: "table",
    });

    if (!subscribersResponse.success) {
      console.error("Failed to fetch subscribers:", subscribersResponse.error);
      return new Response("Failed to get subscribers", { status: 500 });
    }
    console.log(`Found ${subscribersResponse.data.length} subscribers`);

    const chunks = chunk(subscribersResponse.data, 100);
    console.log(`Splitting subscribers into ${chunks.length} chunks of 100`);

    for (const [index, subs] of chunks.entries()) {
      console.log(`Processing chunk ${index + 1}/${chunks.length}`);
      try {
        await resend.batch.send(
          subs.map((sub) => {
            return {
              from: "Acme <onboarding@resend.dev>",
              to: sub.email,
              subject: email._title,
              react: (
                <div>
                  <h1>{email._title}</h1>
                  <div>
                    <RichText content={email.body.json.content} />
                  </div>
                </div>
              ),
            };
          }),
        );
        console.log(`Successfully sent emails to chunk ${index + 1}`);
      } catch (error) {
        console.error(`Failed to send emails for chunk ${index + 1}:`, error);
        throw error; // Re-throw to be caught by outer try-catch
      }
    }

    console.log("Newsletter sending process completed successfully");
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Newsletter sending process failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
