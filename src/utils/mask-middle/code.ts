/**
 * 手机号脱敏，中间4位隐藏：138****5678
 */
export function maskMiddle4(phone: string): string {
  return phone.slice(0, 3) + '****' + phone.slice(7);
}

/**
 * 手机号脱敏，仅显示前3位：138********
 */
export function maskMiddleKeepPrefix(phone: string): string {
  return phone.slice(0, 3) + '********';
}

/**
 * 仅显示后4位：*******5678
 */
export function maskMiddleKeepSuffix(phone: string): string {
  return '*******' + phone.slice(7);
}
