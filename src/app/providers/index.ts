import compose from "compose-function";
import { withTheme } from "./with-theme";
import {withStore} from "./with-store";

export const withProviders = compose(withTheme, withStore);