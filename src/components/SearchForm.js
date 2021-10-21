import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";

export default function SearchForm(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (name !== "") {
      props.hendleFormSearch(name);
    }
  });

  return (
    <Form>
      <Form.Field>
        <input
          type="text"
          value={name}
          placeholder="Search Song, Artist, Album"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Field>
    </Form>
  );
}
