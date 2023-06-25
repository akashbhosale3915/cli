import { Command, Flags } from "@oclif/core";
import * as fs from "node:fs";

export default class Hello extends Command {
  static description = "Fetch json data and save to file";

  static examples = [
    `$ oex fetch --url <url> --filename <filename>`,
    `$ oex fetch -u <url> -f <filename>`,
  ];

  static flags = {
    url: Flags.string({
      description: "The URL from which json to be fetched",
      required: true,
      multiple: false,
      char: "u",
    }),
    filename: Flags.string({
      description: "The filename where json to be saved",
      required: true,
      multiple: false,
      char: "f",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Hello);

    try {
      const dataPromise = await fetch(flags.url);
      const data = await dataPromise.json();
      const stringifyData = JSON.stringify(data, null, 2);
      if (!fs.existsSync("root")) {
        fs.mkdirSync("root");
      }
      fs.writeFileSync(`./root/${flags.filename}.json`, stringifyData);
    } catch (error) {
      console.log(error);
    }
  }
}
