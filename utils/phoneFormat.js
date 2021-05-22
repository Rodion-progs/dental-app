export default (str) => {
  if (!str) return;
  let phone = str;
  if (phone.startsWith('+')) {
    phone = str.slice(1);
  }
  if (phone.startsWith('8')) {
    phone = '7' + str.slice(1);
  }
  console.log(phone);
  return phone.split('').reduce((result, n) => {
    return result.replace('X', n);
  }, '+X (XXX) XXX-XX-XX');
}
