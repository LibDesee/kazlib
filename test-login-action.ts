
import { loginUser } from './src/app/actions/auth'

async function test() {
  console.log('Testing login for admin with 123456...')
  const res = await loginUser('admin', '123456')
  console.log('Result:', JSON.stringify(res, null, 2))
  
  console.log('Testing login for teacher with 123456...')
  const res2 = await loginUser('teacher', '123456')
  console.log('Result:', JSON.stringify(res2, null, 2))

  console.log('Testing login for student with 123456...')
  const res3 = await loginUser('student', '123456')
  console.log('Result:', JSON.stringify(res3, null, 2))
}

test().catch(console.error)
