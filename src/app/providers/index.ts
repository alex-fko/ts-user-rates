import compose from "compose-function";
import { withTheme } from "./with-theme";
import {withQuery} from "./with-query";
import {withStore} from "./with-store";

export const withProviders = compose(withTheme, withQuery, withStore);