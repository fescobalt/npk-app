import { useEffect, useState } from "react";
import ComboBox from "../../shared/ui/combo-box/combo-box";
import styles from './cards-visualizer.module.css';
import { Requester } from "../../shared/api/requester";
import { Quote, ToDo } from "../../shared/api/enitities";

const sources = ["quotes", "todos"];

const CardsVisualizer : React.FC = () => {
  const [source, setSource] = useState<string>("quotes");
  const [list, setList] = useState<Array<ToDo | Quote>>([]);

  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(5); // not used for now

  const [displayType, setDisplayType] = useState<string>("quotes");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changeSource = async () => {
    let res = null;
    
    setError(null);
    setLoading(true);

    if(!sources.includes(source)) {
      setList([]);
      setLoading(false);
      setError("Недопустимый источник");
      return;
    }
    // data source was changed - reset page to 0
    if(displayType !== source) {
      setPage(0);
    }

    setDisplayType(source);
    try {
      if(source === "quotes") {
        res = await Requester.getQuotes(page * Requester.limit);
        setList(res.quotes);
      } 
      if(source === "todos") {
        res = await Requester.getTodos(page * Requester.limit);
        setList(res.todos);
      }
    } catch (err: any) {
      setError(err.message);
      setList([]);
    }
    if(res && res.total) {
      setMaxPage(Math.floor(res.total / Requester.limit) + 1);
    }
    setLoading(false);
  };

  // first load
  useEffect(() => { changeSource() }, [page]);

  return (<div>

    <ComboBox 
      placeholder="Источник"
      onKeyUp={e => e.code === 'Enter' && changeSource()}
      onChange={e => setSource(e.target.value)}
      values={sources}
      disabled={isLoading}
      defaultValue={source}
      error={error !== null}
    />

    <p className={styles.helpText}>{error ? error : "После изменения - Enter"}</p>

    <div className={styles.paginator}>
      <button disabled={isLoading || page === 0} onClick={() => setPage(page - 1)}>{"<<"}</button>
      <div>{page + 1} / {maxPage}</div>
      <button disabled={isLoading || page + 1 >= maxPage} onClick={() => setPage(page + 1)}>{">>"}</button>
      {isLoading && <div>Загрузка...</div>}
    </div>

    <div>
      {!isLoading && list.length === 0 && <p>Пусто</p>}
      {list.map((item) => (<user-card key={item.id} type={displayType} info={JSON.stringify(item)} ></user-card>))}
    </div>
  </div>);
}

export default CardsVisualizer;