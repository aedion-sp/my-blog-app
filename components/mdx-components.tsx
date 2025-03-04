import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Toc } from "@stefanprobst/rehype-extract-toc";
import { Callout } from "./callout";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return {
    Component: fn({ ...runtime }).default,
    TableOfContents: fn({ ...runtime }).toc as Toc,
  };
};

const components = {
  Image,
  Callout,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const { Component } = useMDXComponent(code);
  return <Component components={components} />;
}

export function MDXToC({ code }: MdxProps) {
  const { TableOfContents } = useMDXComponent(code);

  return TableOfContents;
}
