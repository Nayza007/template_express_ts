import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: "ap-southeast-1",
});

const cloudWatchClient = new CloudWatchLogsClient({
  region: "ap-southeast-1",
});

export const cloudWatchLog = async (message: any, logStream: string) => {
  const messageString = JSON.stringify(message);
  const logData = messageString;
  const params = {
    logGroupName: "topupOnline", // ชื่อของ log group
    logStreamName: logStream, // ชื่อของ log stream
    logEvents: [
      {
        message: logData, // ข้อมูล log ที่คุณต้องการส่ง
        timestamp: Date.now(), // timestamp เวลาของ log event
      },
    ],
  };
  const command = new PutLogEventsCommand(params);
  try {
    return await cloudWatchClient.send(command);
  } catch (error) {
    console.error("Error reserveItemLog", error);
  }
};
