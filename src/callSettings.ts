import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

export const callSettings = () => {
  const settings: SettingSchemaDesc[] = [
    {
      key: "lightningCombos",
      title: "Lightning Combos",
      type: "number",
      default: 20,
      description: "Multiples of combos to hit before lightning breaks.",
    },
    {
      key: "coolingOff",
      title: "Cooling Off",
      type: "number",
      default: 10,
      description: "Number of seconds to rest before your combos reset to 0.",
    },
  ];

  logseq.useSettingsSchema(settings);
};
