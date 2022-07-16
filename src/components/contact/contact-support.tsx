import { FC } from 'react';
import { useTranslation } from 'react-i18next';

 

interface Props {
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = () => {
  const { t } = useTranslation('common');
  return (
    <div  >
      
       
             <img src="https://media.istockphoto.com/photos/how-can-i-help-you-picture-id519122924?k=20&m=519122924&s=612x612&w=0&h=ffQVbTzttHSi15gbCxdB21o2sMGFYK2ZyyLgs6iPiK4=" />
          
       
       
    </div>
  );
};

export default ContactSupport;
