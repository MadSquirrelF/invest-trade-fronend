/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';
import cn from 'classnames';
import MaterialIcon from '../MaterialIcon';
import styles from './Ask.module.scss';

const data = [{
  id: `01`,
  question: `Почему Инвест-Трейд?`,
  answer: `Инвест-Трейд поставляет и комплектует ВСЕМИ необходимыми материалами для производства и монтажа окон из ПВХ и Алюминия.`,
},
{
  id: `02`,
  question: `Сколько у вас стоит доставка?`,
  answer: `Доставка осуществляется бесплатно от суммы заказа на 50.000 рублей.`,
},
{
  id: `03`,
  question: `Осуществляете ли вы монтаж?`,
  answer: `Да. Инвест-Трейд работает со строительными компаниями и выполняет остекление корпоративных заказов под ключ.`,
},
{
  id: `04`,
  question: `Есть ли у вас технические каталоги на продукцию?`,
  answer: `Да. Все каталоги вы можете скачать в нашем разделе <Каталог> или обратится к нашим менеджерам.`,
}];

const Ask: FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const toogle = (i: number) => {
    if (i === selected) {
      return setSelected(null);
    }
    return setSelected(i);
  };
  return (
    <section
      className={styles.root}
      id="faq"
    >
      <div className={styles.title}>
        <h1>
          Часто задаваемые
          <span> вопросы</span>
        </h1>
      </div>

      <div className={styles.row}>

        <div className={styles.container}>
          {data.map((item, i) => (
            <div
              className={cn(styles.item, { [styles.active]: selected === i })}
              key={item.id}
            >
              <div
                className={styles.question}
                onClick={() => toogle(i)}
              >
                <div className={styles.content}>
                  <div className={styles.count}>
                    <p>{item.id}</p>
                  </div>
                  <h2>{item.question}</h2>
                </div>
                <MaterialIcon name="MdKeyboardArrowDown" />
              </div>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}

        </div>

      </div>
      <div className={styles.bgtext}>
        FAQ ? ?
      </div>
    </section>
  );
};

export default Ask;
