import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

type TMailData = {
  from: string;
  to: string | undefined;
  subject: string;
  data: {
    employeeName?: string;
    headOfficeApproverName?: string;
    branchApproverName?: string;
    workStandInName?: string;
    subject?: string;
    startDate?: string;
    leaveType?: string;
  };
};

const mailTextBuilder: (rawText: {
  employeeName?: string;
  headOfficeApproverName?: string;
  workStandInName?: string;
  subject?: string;
  startDate?: string;
  leaveType?: string;
}) => string = (rawText) => {
  const rawTextVals = Object.entries(rawText);

  const keyMap = {
    employeeName: "Employee Name",
    headOfficeApproverName: "Head office approver",
    workStandInName: "Work assignment stand in",
    subject: "Subject",
    startDate: "Start date",
    leaveType: "Leave type",
  };

  return rawTextVals
    .map((values) => {
      return `${keyMap[values[0] as keyof typeof keyMap]}: ${values[1]}`;
    })
    .join(",\n\n");
};

const mailHtmlBuilder: (rawHtml: {
  employeeName?: string;
  headOfficeApproverName?: string;
  workStandInName?: string;
  subject?: string;
  startDate?: string;
  leaveType?: string;
}) => string = (rawHtml) => {
  const rawHtmlVals = Object.entries(rawHtml);

  const keyMap = {
    employeeName: "Employee Name",
    headOfficeApproverName: "Head office approver",
    workStandInName: "Work assignment stand in",
    subject: "Subject",
    startDate: "Start date",
    leaveType: "Leave type",
  };

  const html =
    `<html><body><main>` +
    rawHtmlVals
      .map((values) => {
        return `<h3>${
          keyMap[values[0] as keyof typeof keyMap]
        }:</h3><br><p>${values[1]}</p><br><br>`;
      })
      .join("") +
    `</main></body></html>`;

  return html;
};

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

export const handleSendMail = async ({
  from,
  to,
  subject,
  data,
}: TMailData) => {
  const mailData = {
    from,
    to,
    subject,
    html: mailHtmlBuilder(data),
    text: mailTextBuilder(data),
  };

  const sendMail = await transporter.sendMail(mailData);
};
