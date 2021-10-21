import React from "react";
import { Container, Header } from "semantic-ui-react";

export default function HeaderNotify({ title }) {
  return (
    <Container textAlign="center">
      <Header as="h4"> No {title} have been found</Header>
    </Container>
  );
}

HeaderNotify.defaultProps = {
  title: "artists",
};
