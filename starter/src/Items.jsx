import SingleItem from './SingleItem';
import {useFetchTasks} from './reactQueryCustomHooks'

const Items = () => {
  const {isLoading, isError, data} = useFetchTasks()

  // console.log(data);

  if (isLoading) {
    return <p style={{ marginTop: '1rem ' }}>Loading...</p>;
  }

    if (isError) {
    return <p style={{ marginTop: '1rem ' }}>there was an error...</p>;
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
