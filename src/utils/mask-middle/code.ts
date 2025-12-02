/**
 * 手机号脱敏，中间4位隐藏：138****5678（最常用）
 */
export function maskMobile(phone: string): string {
  return phone.slice(0, 3) + '****' + phone.slice(7);
}

/**
 * 手机号脱敏，仅显示前3位：138********
 */
export function maskMobileKeepPrefix(phone: string): string {
  return phone.slice(0, 3) + '********';
}

/**
 * 仅显示后4位：*******5678
 */
export function maskMobileKeepSuffix(phone: string): string {
  return '*******' + phone.slice(7);
}
