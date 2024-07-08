import { ResponseInfo } from "../../interfaces/types";
import { STATUS_TYPES } from "../../utils/constants";

export function Alert({ message, status }: ResponseInfo) {
    return message ? (
      <div className={`alert alert-${status == STATUS_TYPES.ERROR ? 'danger' : 'success'} mt-3 mb-0`}>
        {message}
      </div>
    ) : null
  }