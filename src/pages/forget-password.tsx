import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
export interface forgetPasswordProps {}

const ForgetPassword: React.FC<forgetPasswordProps> = () => {
  const [, forgotPassword] = useForgotPasswordMutation();

  const [complete, setComplete] = useState(false);

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>If account with this email exists, we sent you an email</Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="email" label="Email" />
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Forget Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgetPassword);
