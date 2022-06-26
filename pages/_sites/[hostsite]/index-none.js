import { Typography, Divider } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const { Title } = Typography

export default function Index({ user = {} }) {
  const { pathname, asPath } = useRouter()

  const fullPath = `${pathname}${asPath}`

  console.log('INDEX PROPS: ', user)

  return (
    <div>
      <Title>This is User multi-tenant pages</Title>
      <Title level={3}>url: {fullPath}</Title>
      <Divider />
    </div>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   const user = res.json()
//   const thisMarking = { mode: 'this is marking' }
//   return {
//     props: {
//       user,
//       thisMarking
//     }
//   }
// }
