import { Link } from "react-router-dom";
import styled from "styled-components";

const SimpleLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

export { SimpleLink as Link };
