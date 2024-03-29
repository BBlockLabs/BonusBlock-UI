import HttpUnauthorizedError from "@/common/errors/HttpUnauthorizedError";
import FormattedError from "@/common/errors/FormattedError";
import { store } from "@/store";
import router from "@/router";
import Toast from "@/common/Toast";

// in case if server response was successfully parsed as JSON, try to see if there's an error
function parseErrorMessage<TPayload>(data: HttpResponse<TPayload>): string {
  let message: string = "";
  if (data.errors && data.errors.length > 0) {
    for (const k in data.errors) {
      if (message !== "") {
        message += "\n";
      }
      message += "• " + data.errors[k][0];
    }
  }
  if (!data.success && !message) {
    message = "The server failed to serve your request";
  }
  return message;
}

export default class HttpResponse<TPayload> {
  payload: TPayload = {} as TPayload;
  errors: Array<string> = [];
  now: string = "";
  success: boolean = false;

  static async fromResponse<TPayload>(
    response: Response
  ): Promise<HttpResponse<TPayload>> {
    let errorMessage = "";
    let data: HttpResponse<TPayload>;
    try {
      data = (await response.json()) as HttpResponse<TPayload>;
      errorMessage = parseErrorMessage<TPayload>(data);
    } catch (e) {
      errorMessage = "Can't parse server response (response code " + response.status + ")";
    }
    if (!response.ok && !errorMessage) {
      errorMessage = "The server returned error code " + response.status;
    }
    if (errorMessage) {
      console.error(errorMessage);
      if (response.status === 401) {
        //TODO: remove formatting dependency
        if (errorMessage === "• ALREADY_LOGGED_IN") {
          router.push("/wallets");
          throw new FormattedError("Already logged in");
        } else {
          Toast.make("Unauthorized", errorMessage, "error", false, 0, "not-logged-in");
          store.dispatch("UserModule/removeSession").then(() => {
            router.push("/");
          });
        }
      }
      throw response.status === 401
        ? new HttpUnauthorizedError(errorMessage)
        : new FormattedError(errorMessage);
    }
    // @ts-ignore
    return data;
  }
}
