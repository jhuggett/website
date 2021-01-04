import React from "react";
import Link from "next/link";


interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { href: string, as: string }

  prefetch?: boolean
}

export default React.forwardRef(({ to, prefetch, ...props }: IProps, ref: any) => {
  if (typeof to === 'string') {
    return (
      <Link href={to} prefetch={prefetch || false}>
        <a {...props} ref={ref} />
      </Link>
    )
  }

  return (
    <Link href={to.href} as={to.as} prefetch={prefetch || false}>
      <a {...props} ref={ref} />
    </Link>
  )
})