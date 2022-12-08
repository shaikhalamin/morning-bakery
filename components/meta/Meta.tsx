import Head from "next/head";
import React from "react";

const Meta: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Head>
  );
};

export default Meta;
