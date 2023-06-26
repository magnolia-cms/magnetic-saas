import Img from '../../components/Img';

function Quote(props) {
  const { quote, fullName, title, image } = props;

  return (
    <div className='Quote-wrapper'>
      <div className='Quote'>
        {quote && <div className='Quote__quote' dangerouslySetInnerHTML={{ __html: quote }} />}
        <div className='Author'>
          <Img className='Author__image' image={image} />
          <div>
            {fullName && <div className='Author__fullName'>{fullName}</div>}
            {title && <div className='Author__title'>{title}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
