import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';

import { Link} from 'react-router-dom';
const DUMMY_QUOTES = [
    {id: "q1", author: 'Bishop', text:'Learning React is fun'},
    {id: "q2", author: 'Bishu', text:'Learning React is great'},
]
const QuoteDetail = () => {

 
  const params = useParams();

  const quote = DUMMY_QUOTES.find(q=> q.id === params.quoteId);

if(!quote){
    return <p>Quote not found</p>
}

  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments...
          </Link>
        </div>
      </Route>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
