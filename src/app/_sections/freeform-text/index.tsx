import { fragmentOn } from "basehub";
import { RichText } from "basehub/react-rich-text";
import { Section } from "@/common/layout";
import { richTextClasses } from "@/app/_components/rich-text";

export const freeformTextFragment = fragmentOn("FreeformTextComponent", {
  body: { json: { content: true } },
});

export type FreeformText = fragmentOn.infer<typeof freeformTextFragment>;

export function FreeformText(freeformText: FreeformText) {
  return (
    <Section>
      <div className={richTextClasses}>
        <RichText content={freeformText.body.json.content} />
      </div>
    </Section>
  );
}
