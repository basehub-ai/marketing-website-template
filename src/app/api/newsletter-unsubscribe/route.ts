import { basehub } from "basehub";
import { deleteEvent } from "basehub/events";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const eventId = url.searchParams.get("event-id");

  if (!eventId) {
    return new Response("Missing stuff", { status: 400 });
  }

  const data = await basehub().query({
    site: {
      footer: {
        newsletter: {
          submissions: {
            adminKey: true,
          },
        },
      },
    },
  });

  const res = await deleteEvent(data.site.footer.newsletter.submissions.adminKey, [eventId]);

  if (!res.success) {
    console.error(res.error);
    return new Response("Failed to delete event", { status: 500 });
  }

  return new Response("Unsubscribed ✅", { status: 200 });
};

export const POST = GET;
