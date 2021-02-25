import React from "react";
import Link from "next/link";


interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { href: string, as: string }

  prefetch?: boolean
}

export default React.forwardRef(({ to, prefetch, ...props }: IProps, ref: any) => {
  if (typeof to === 'string') {
    return (
      <Link href={to}>
        <a {...props} ref={ref} />
      </Link>
    )
  }

  return (
    <Link href={to.href} as={to.as}>
      <a {...props} ref={ref} />
    </Link>
  )
})