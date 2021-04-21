import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");

  const router = useRouter();
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ token, newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword(values);
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            } else setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            console.log("user is here", response.data?.changePassword.user);
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
              <Flex>
                <Box mr="auto">
                  <Box style={{ color: "red" }}>{tokenError}</Box>
                </Box>
                <NextLink href="./forget-password">
                  <Link>Click here to get new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button mt={4} type="submit" isLoading={isSubmitting}>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword as any);
