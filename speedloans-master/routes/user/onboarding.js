const {
  verify_phone_code,
  get_phone_code,
  change_password,
  change_transaction_pin,
  create_transaction_pin,
  update_phone_code,
} = require("../../controllers/users/onboardingController");

const onboardingRouter = require("express").Router();

onboardingRouter.post("/get-phone-verif-code", get_phone_code);
onboardingRouter.post("/verify-phone", verify_phone_code);
onboardingRouter.post("/change-password", change_password);
onboardingRouter.post("/create-pin", create_transaction_pin);
onboardingRouter.post("/change-transaction-pin", change_transaction_pin);
onboardingRouter.post("/update-phone-code", update_phone_code);

module.exports = onboardingRouter;
