import {CompanyModule} from "../company/company.module";

export class SubscriptionPriceModule {
  "id": any | null;
  "subscriptionPrice":  string;
  "subscriptionStartDate": Date | null;
  "subscriptionEndDate": Date | null;
  "company": CompanyModule;
}
