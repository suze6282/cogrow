export function checkContent(value: string) {
  const risky = ['最好喝', '第一', '绝对', '必喝']
  const match = risky.find((word) => value.includes(word))
  return match ? `“${match}”可能构成无法验证的绝对化表达` : ''
}
