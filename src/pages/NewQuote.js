import QuoteForm from '../components/quotes/QuoteForm';
import {useHistory} from 'react-router-dom';
import useHttp from '../hooks/use-http';
import {addQuote} from '../lib/api';
import {useEffect} from 'react';

const NewQuote = () =>{
  const {sendRequest, status} = useHttp(addQuote);
  const history = useHistory();

  //used that if the req is sent, it will redirect to quotes page
  useEffect(() =>{
    if(status === 'completed'){
      history.push('/quotes');
    }
  }, [status, history])

    const addQuoteHandler = (data) =>{

        sendRequest(data);
    }
    return <QuoteForm onLoading={status==='pending'} onAddQuote={addQuoteHandler}/>
}

export default NewQuote;