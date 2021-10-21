import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";

export default function SearchForm(props) {
  return (
    <Input
      icon="search"
      value={props.query}
      placeholder="Search Song, Artist, Album ..."
      onChange={(e) => props.hendleFormSearch(e.target.value)}
    />
  );
}
