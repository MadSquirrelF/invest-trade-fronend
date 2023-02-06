import { IGalleryShip } from "./Ship.interface";
import image_1 from '../../../assets/images/ship/4.png';
import image_2 from '../../../assets/images/ship/2.png'
import image_3 from '../../../assets/images/ship/3.png'
import image_4 from '../../../assets/images/commons/image_1.png';
export const GalleryShipList: IGalleryShip = {
  items: [{
    id: '01',
    text: "Производим доставку комплектующих быстро и в срок!",
    image: image_1,
  }, {
    id: '02',
    text: "Большой выбор товара на складе и под заказ!",
    image: image_2,
  }, {
    id: '03',
    text: "Полная комплектация и упаковка!",
    image: image_3,
  }, {
    id: '04',
    text: "Доставляем окна по всей россии!",
    image: image_4,
  },]
}