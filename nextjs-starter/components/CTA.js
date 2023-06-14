import A from './A';

export function getUrl(cta) {
  let href;

  if (cta?.link) {
    const field = cta.link.field;

    href = cta.link[field] || '';

    if (field === 'postLink') {
      const lastIndex = href.lastIndexOf('/');
      const replacement = '/blog/';

      if (lastIndex !== -1) {
        href = href.substring(0, lastIndex) + replacement + href.substring(lastIndex + 1);
      }
    }
  }

  if (cta?.href) href = cta.href;

  return href;
}

function CTA(props) {
  const { className, cta, url } = props;
  const href = url ? url : getUrl(cta);

  return href ? <A className={className} href={href} label={cta.label} /> : null;
}

export default CTA;
