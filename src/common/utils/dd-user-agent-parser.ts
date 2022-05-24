import DeviceDetector, { DeviceDetectorResult } from "device-detector-js";
import { Service } from "typedi";
import { Either, notOk, ok } from ".";
import { UserAgentParseError } from "../errors";
import { UserAgent } from "../types";
import { UserAgentParser } from "./user-agent-parser.interface";

@Service(DDUserAgentParser.name)
export class DDUserAgentParser implements UserAgentParser {
  private deviceDetector: DeviceDetector;
  constructor() {
    this.deviceDetector = new DeviceDetector({ skipBotDetection: true });
  }

  parse(userAgent: string): Either<UserAgentParseError, UserAgent> {
    try {
      const parsedUserAgent: DeviceDetectorResult =
        this.deviceDetector.parse(userAgent);
      return ok<UserAgent>(this.buildUserAgentResult(parsedUserAgent));
    } catch (error) {
      return notOk<UserAgentParseError>(
        new UserAgentParseError((error as Error).message)
      );
    }
  }

  private buildUserAgentResult(
    parsedUserAgent: DeviceDetectorResult
  ): UserAgent {
    return {
      os: parsedUserAgent.os?.name || "unknown",
      device: parsedUserAgent.device?.brand || "unknown",
      browser: parsedUserAgent.client?.name || "unknown",
    };
  }
}
