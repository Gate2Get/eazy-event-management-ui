import fs from "fs";
import u from "underscore";

const ValidFields = {
  singleText: [
    "AGENT",
    "BDAY",
    "BEGIN",
    "END",
    "FN",
    "FULLNAME",
    "GEO",
    "MAILER",
    "NICKNAME",
    "NOTE",
    "PRODID",
    "REV",
    "ROLE",
    "TITLE",
    "TZ",
    "UID",
    "URL",
    "VERSION",
  ],

  multipleText: ["CATEGORIES", "NICKNAME", "ORG"],

  singleBinary: ["KEY", "LOGO", "PHOTO", "SOUND"],

  rfc2425: ["NAME", "PROFILE", "SOURCE"],

  structured: ["ADR", "EMAIL", "IMPP", "LABEL", "N", "PHOTO", "TEL"],
};

export class VCard {
  readData(
    card: string,
    cb: (error: Error | null | Error[], data?: any) => void
  ): void {
    const vCards: string[][] = [[]];
    let data = card.split(/\r\n(?=\S)|\r(?=\S)|\n(?=\S)/);

    // Support for multiple vcards into a file
    let vCardCount = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      data[i] = data[i].replace(/^item\d+\.|\r\n\s*|\r\s*|\n\s*/g, "");
      vCards[vCardCount].unshift(data[i]);
      if (data[i] === "BEGIN:VCARD" && i !== 0) {
        ++vCardCount;
        vCards.push([]);
      }
    }

    const errors: Error[] = [];
    const vCardsParsed: any[] = [];

    vCardCount = 0;
    for (let i = 0; i < vCards.length; ++i) {
      const validationError = this.getValidationError(vCards[i]);
      if (validationError) {
        errors.push(validationError);
        tryCallback();
      } else {
        this.parsevCard(vCards[i], (err, json) => {
          if (err) {
            errors.push(err);
          } else if (json) {
            vCardsParsed.push(json);
          }
          tryCallback();
        });
      }
    }

    function tryCallback() {
      if (++vCardCount === vCards.length) {
        if (errors && errors.length > 0) {
          cb(errors.length === 1 ? errors[0] : errors);
        } else {
          cb(null, vCardsParsed.length === 1 ? vCardsParsed[0] : vCardsParsed);
        }
      }
    }
  }

  parsevCard(
    data: string[],
    cb: (error: Error | null, json?: any) => void
  ): void {
    let inserted = 0;
    const json: any = {};
    const version = this.getVersion(data);

    for (let f = data.length - 1; f >= 0; f--) {
      const fields = data[f].split(":");

      if (fields[0] === "BEGIN" || fields[0] === "END") {
        continue;
      }

      if (
        u.contains(ValidFields.singleText, fields[0]) ||
        u.contains(ValidFields.rfc2425, fields[0]) ||
        fields[0].match(/^X-.*/)
      ) {
        json[fields[0]] = fields[1];
        data.splice(f, 1);
        inserted++;
      }
    }

    for (let f = data.length - 1; f >= 0; f--) {
      const fields = data[f].split(":");

      if (fields[0] === "BEGIN" || fields[0] === "END") {
        continue;
      }

      const d = fields[0].split(";");
      const snippet: any = {};
      const type: string[] = [];

      if (version == 3.0) {
        if (d[1]) {
          d[1] = d[1].replace(/TYPE=/g, "");
        }
      }

      if (version === 2.1 || version == 3.0) {
        for (let i = d.length - 1; i >= 1; i--) {
          type.push(d[i]);
        }

        if (type.length > 0) {
          snippet.type = type;
          snippet.value = fields[1];
          json[d[0]] = snippet;
        } else {
          if (d[0] === "N") {
            json[d[0]] = fields[1]
              .replace(/;+$/g, "")
              .replace(/;/, ", ")
              .replace(/ $/, "");
          } else {
            json[d[0]] = fields[1].replace(/;/g, " ");
          }
        }
      } else if (version === 4) {
        const label: string[] = [];
        const value: string[] = [];

        for (let i = d.length - 1; i >= 1; i--) {
          if (d[i].match(/TYPE/)) {
            const t = d[i].replace(/TYPE=/g, "").replace(/\"/g, "").split(",");
            for (let j = t.length - 1; j >= 0; j--) {
              type.push(t[j]);
            }
          } else if (d[i].match(/LABEL/)) {
            label.push(d[i].replace(/LABEL=/g, "").replace(/\"/g, ""));
          } else if (d[i].match(/VALUE/)) {
            value.push(d[i].replace(/VALUE=/g, ""));
          }
        }

        if (type.length > 0) {
          snippet.type = type;
          if (label.length > 0) {
            snippet.value = label[0];
          } else {
            snippet.value = fields[2];
          }
          json[d[0]] = snippet;
        } else {
          if (d[0] === "N") {
            json[d[0]] = fields[1]
              .replace(/;+$/g, "")
              .replace(/;/, ", ")
              .replace(/ $/, "");
          } else {
            json[d[0]] = fields[1].replace(/;/g, " ");
          }
        }
      } else {
        cb(new Error(`Unknown version encountered: ${version}`));
        return;
      }
    }

    if (inserted > 0) {
      cb(null, json);
    } else {
      cb(new Error("No JSON elements found?!"));
    }
  }

  getValidationError(data: string[]): Error | null {
    let required_elements_found = 0;

    if (data[0] !== "BEGIN:VCARD" || data[data.length - 1] !== "END:VCARD") {
      return new Error("BEGIN:VCARD or END:VCARD missing.");
    }

    for (let f = data.length - 1; f >= 0; f--) {
      if (data[f].match(/^(VERSION|FN|N):/)) {
        required_elements_found++;
      }
    }

    if (required_elements_found < 2) {
      return new Error(
        "One or more required elements are missing (VERSION, N or FN)"
      );
    }

    const version = this.getVersion(data);

    if (version > 2.1) {
      for (let f = data.length - 1; f >= 0; f--) {
        if (data[f].match(/^N:/)) {
          required_elements_found++;
        }
      }
      if (required_elements_found < 3) {
        return new Error(
          "One or more required elements are missing (VERSION, N and FN)"
        );
      }
    }

    for (let f = data.length - 1; f >= 0; f--) {
      const field = data[f].replace(/(:|;).*/g, "");
      if (
        !(
          u.contains(ValidFields.singleText, field) ||
          u.contains(ValidFields.multipleText, field) ||
          u.contains(ValidFields.rfc2425, field) ||
          u.contains(ValidFields.singleBinary, field) ||
          u.contains(ValidFields.structured, field) ||
          field.match(/^X-.*/)
        )
      ) {
        return new Error(`Invalid field found: \`${field}\``);
      }
    }

    return null;
  }

  getVersion(data: string[]): number {
    let version: string = "";
    for (let f = data.length - 1; f >= 0; f--) {
      if (data[f].match(/VERSION/)) {
        version = data[f].split(":")[1];
      }
    }

    const parsedVersion = parseFloat(version);
    if (isNaN(parsedVersion)) {
      return 0;
    } else {
      return parsedVersion;
    }
  }
}
