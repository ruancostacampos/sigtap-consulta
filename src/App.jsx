import { useEffect, useState } from 'react';
import { FaSearch} from "react-icons/fa";
import debounce from 'lodash.debounce';
import data from '../src/data/tb_procedimento.json';
import Footer from './components/Footer';

function App() {
  let defaultProcedure = {
    vl_sh_brl: "",
    vl_sa_brl: "",
    vl_sp_brl: "",
    total_h: "",
    dt_competencia_formated: ""
  }

  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [haveMoreItens, setHaveMoreItens] = useState(0);
  const [currentProcedure, setCurrentProcedure] = useState(defaultProcedure)

  const updateSearchInput = (e) => setSearchInput(e.target.value);

  useEffect(() => {

    if (searchInput === '') {
      setResults([]);
      setHaveMoreItens(0)
      return;
    }

    let resultsCache = data.filter(
      procedimento => procedimento.no_procedimento.includes(searchInput.toUpperCase())
        || procedimento.co_procedimento.includes(searchInput)
    );

    resultsCache.length > 5 ? setHaveMoreItens(resultsCache.length - 4) : setHaveMoreItens(0);

    setResults(resultsCache.slice(0, 5));


  }, [searchInput])

  const debouncedOnChange = debounce(updateSearchInput, 500)

  const toBRL = (item) => {

    const convertIntToBRL = (a) => {
      a = a.toString()
      a = a.substring(0, a.length - 2) + '.' + a.substring(a.length - 2, a.length);
      a = parseFloat(a).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      return a;
    }

    let total_h_cache = parseInt(item.vl_sh) + parseInt(item.vl_sp)

    item.dt_competencia_formated = `${item.dt_competencia.substring(0, 4)}/${item.dt_competencia.substring(4, 6)}`

    item.total_h = convertIntToBRL(total_h_cache)
    item.vl_sa_brl = convertIntToBRL(item.vl_sa);
    item.vl_sh_brl = convertIntToBRL(item.vl_sh);
    item.vl_sp_brl = convertIntToBRL(item.vl_sp);


    return item;
  }

  const handleClick = (item) => {
    setCurrentProcedure(toBRL(item));
    setSearchInput('');
  }

  const empty = () => {
    setCurrentProcedure(null);
    setResults([]);
  }



  return (
    <div className="h-full w-full flex items-center flex-col justify-center">
      <div className="flex flex-1 flex-col max-w-[430px] w-full items-center p-4 justify-center">
        <h3 className="text-xl font-mono p-8">SIGTAP Consulta</h3>
        <div className="relative flex flex-col w-full justify-center">
          <div className="w-full relative flex">
            <FaSearch className="absolute mt-2 w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Insira o código ou o nome do procedimento"
              autoComplete='off'
              className="w-full h-10 placeholder-gray-500 font-semibold rounded-t border-2 pl-8"
              onChange={debouncedOnChange}
            />
          </div>
          <ul className="absolute mt-[280px] w-full bg-slate-50 rounded-b max-h-60 overflow-y-auto">
            {results.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 text-gray-500 hover:bg-slate-200 hover:text-black"
                onClick={() => handleClick(item)}
              >
                {`${item.no_procedimento} - ${item.co_procedimento}`}
              </li>
            ))}
            {haveMoreItens > 0 && <li className="cursor-pointer p-2 bg-gray-300 align-self-center">Refine a busca, ({haveMoreItens}) itens encontrados...</li>}
          </ul>
        </div>

        <div className="mt-2 container p-2 flex-column w-full justify-center bg-slate-200 rounded-t">
          <h3><strong>Código do procedimento: </strong>{currentProcedure.co_procedimento}</h3>
          <h3><strong>Nome do procedimento: </strong>{currentProcedure.no_procedimento}</h3>
          <div className="w-full flex justify-between">
            <h3><strong>Serviço Ambulatorial: </strong></h3>
            <p>{currentProcedure.vl_sa_brl}</p>
          </div>
          <div className="w-full flex justify-between">
            <h3><strong>Serviço Hospitalar:</strong></h3>
            <p>{currentProcedure.vl_sh_brl}</p>
          </div>
          <div className="w-full flex justify-between">
            <h3><strong>Serviço Profissional:</strong></h3>
            <p>{currentProcedure.vl_sp_brl}</p>
          </div>
          <div className="w-full flex justify-between">
            <h3><strong>Total Hospitalar:</strong></h3>
            <p>{currentProcedure.total_h}</p>
          </div>
          <div className="w-full flex justify-between">
            <h3><strong>Competência:</strong></h3>
            <p>{currentProcedure.dt_competencia_formated}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
