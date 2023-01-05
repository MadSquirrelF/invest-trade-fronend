import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const ProductLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={413}
    height={607}
    viewBox="0 0 413 607"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="10" rx="5" ry="5" width="139" height="35" />
    <rect x="10" y="59" rx="5" ry="5" width="285" height="248" />
    <circle cx="334" cy="89" r="29" />
    <rect x="11" y="323" rx="10" ry="10" width="198" height="24" />
    <rect x="16" y="441" rx="10" ry="10" width="198" height="10" />
    <rect x="11" y="359" rx="10" ry="10" width="285" height="54" />
    <rect x="15" y="462" rx="10" ry="10" width="285" height="24" />
    <rect x="17" y="498" rx="10" ry="10" width="198" height="10" />
    <rect x="16" y="519" rx="10" ry="10" width="285" height="24" />
    <rect x="18" y="557" rx="10" ry="10" width="198" height="10" />
    <rect x="17" y="578" rx="10" ry="10" width="285" height="24" />
    <circle cx="335" cy="179" r="29" />
    <circle cx="337" cy="274" r="29" />
  </ContentLoader>
)

export default ProductLoader
