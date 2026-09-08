import { useState,useEffect } from "react"
import '../css/estilo.css'

const Tarefas = () => {
    //HOOK- useState para armazenar a tarefa
    const [tarefas, setTarefas]=useState(()=>{
    //LOCALSTORAGE
    const salvarTarefa = localStorage.getItem("item-tarefa");
    return salvarTarefa ? JSON.parse(salvarTarefa):[]; 
    });
    //useState para o campo da tarefa
    const [campo, setCampo]=useState("");

    //HOOK useEffect - realiza o efeito colateral, no exemplo
    //ao cadastrar a tarefa aparece automaticamente na tela

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas])
   

    //Função Adicionar Tarefa
    const AdicionarTarefa=(e)=>{
      //previne que a pagina se recarregue
        e.preventDefault();
        //valida o campo se for vazio
        if(!campo.trim()) return;

        //objeto criar a tarefa
        const novaTarefa={
          id:Date.now(),
          text:campo,
        };
        setTarefas([...tarefas,novaTarefa])
        setCampo('');
    }
    //FUNÇÃO REMOVER TAREFA
    const RemoverTarefa=(id)=>{
      const apagartarefa =tarefas.filter((tarefa)=>tarefa.id !==id);
      setTarefas(apagartarefa);
    }


  return (
    <div className="max-w-md mx-auto mt-10 bg-sky-200 rounded-2xl shadow-lg border border-gray-400">
      <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">Minha Lista de tarefas</h1>
      <form onSubmit={AdicionarTarefa} className="flex gap´-2 mb-6">
        <input
          type="text"
          value={campo}
          onChange={(e)=>{setCampo(e.target.value)}}
          placeholder="Digite uma tarefa"
          className="flex-1 px-4 py-2 border border-r-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent text-gray-800 placeholder-gray-800"
        />
        <button type="submit"
        className="bg-indigo-700 hover:bg-indigo-500 text-white font-medium px-5 py-2
        rounded-2xl transition-colors cursor-pointer"
        
        >Adicionar</button>
      </form>
      <ul className="space-y-3">
        {tarefas.map((tarefa)=>(
          <li key={tarefa.id}
          className="flex items-center justify-between p-3 bg-gray-100 border border-amber-200 rounded-2xl shadow-sm hover:bg-amber-200
          transition-colors"
          >
              <span className="text-black break-all mr-2">{tarefa.text}</span>
          <button onClick={()=>RemoverTarefa(tarefa.id)}
          className="bg-indigo-700 hover:bg-indigo-500 text-white font-medium px-5 py-2
          rounded-2xl transition-colors cursor-pointer"
            
            
            >Excluir</button>
          </li>

        ))}
      </ul>
      {/* compara senão tiver tarefas deixar a nenhuma tarefa salva */}
      {tarefas.length === 0 && (
        
        <p className="text-center text-gray-800 italic mt-4">Nehuma tarefa salva</p>
      )}

    </div>
  )
}

export default Tarefas
