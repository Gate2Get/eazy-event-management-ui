import * as xlsx from "xlsx";

/**
 * This function parses an xlsx file and returns its data as a JSON object.
 * @param {any} file - The file parameter is the Excel file that needs to be parsed. It is of type
 * "any", which means it can be any data type. However, it is expected to be a file object.
 * @returns The function `parseXlsx` returns a Promise that resolves to an array of JSON objects parsed
 * from the first sheet of an Excel file. If there is an error, the Promise is rejected with an error
 * message.
 */
export const parseXlsx = async (file: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        resolve(json);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("No files"));
    }
  });
};
