import { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import debounce from 'lodash.debounce'
import data from '../src/data/tb_procedimento.json'

function App() {
  
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [haveMoreItens, setHaveMoreItens] = useState(0);
  const [currentProcedure, setCurrentProcedure] = useState(null)

  const updateSearchInput = (e) => setSearchInput(e.target.value);
  
  useEffect(() => {
    console.log(' use effect run')

    if(searchInput === '') { 
      setResults([]);
      setHaveMoreItens(0)
      return;
    }
   
    let resultsCache =  data.filter(
      procedimento => procedimento.no_procedimento.includes(searchInput.toUpperCase())
    );

    resultsCache.length > 5 ? setHaveMoreItens(resultsCache.length - 4) : setHaveMoreItens(0);

    setResults(resultsCache.slice(0, 5));
    console.log(results)

  }, [searchInput])

  const debouncedOnChange = debounce(updateSearchInput, 1000)

  const handleClick = (item) => {
    setCurrentProcedure(item)
    setSearchInput('')
  }


  return (
    <div className="container p-2 h-screen w-screen mx-auto flex items-center flex-col justify-center">
      {currentProcedure && (
        <div className="container p-2 flex-column w-[390px] justify-center bg-gray-200 rounded-t">
          <h2>Nome do procedimento: {currentProcedure.no_procedimento}</h2>
          <h2>Código do procedimento: {currentProcedure.co_procedimento}</h2>
        </div>
      )}
      <div className="flex flex-column w-[390px] justify-center">
        <div className=" min-w-full relative flex items-center">
          <FaSearch className="absolute w-5 h-5 ml-2"/>
          <input
            type="text" 
            placeholder="Insira o código ou o nome do procedimento"
            autoComplete='off'
            className="w-full max-w-md h-10 placeholder-gray-500 font-semibold rounded-t border-2 px-8"
            onChange={debouncedOnChange}
          />
        </div>
        <ul className="absolute mt-10 w-[390px] bg-slate-50 rounded-b max-h-60 overflow-y-auto">
          {results.map( (item, index) => (
            <li 
              key={index} 
              className="cursor-pointer p-2 text-gray-500 hover:bg-slate-200 hover:text-black"
              onClick={() => handleClick(item)}
            >
              {item.no_procedimento}
            </li>
          ))}
          {haveMoreItens > 0 &&  <li className="cursor-pointer p-2 bg-gray-300 align-self-center">Refine a busca, ({haveMoreItens}) itens encontrados...</li>}
        </ul>
      </div>
    </div>
  )
}

export default App
