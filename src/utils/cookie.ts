export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props?: { [key: string]: string | number | boolean } & {
    expires?: number | string | Date;
  }
): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    if (Object.prototype.hasOwnProperty.call(props, propName)) {
      updatedCookie += "; " + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  }
  document.cookie = updatedCookie;
}

export function delCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
