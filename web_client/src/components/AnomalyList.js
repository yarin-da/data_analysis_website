import {useState, useMemo} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {FixedSizeList} from "react-window";
import {makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ErrorIcon from '@material-ui/icons/Error';
import SearchBar from "./SearchBar";

const useStyles = makeStyles({
  item: {
    '& span, & svg': {
      fontSize: '0.9rem'
    }
  },
});

const listStyle = {
  backgroundColor: "#0a1a2a", 
  color: "#fff",
  borderTop: "solid #607f9f 1px",
  borderBottom: "solid #607f9f 1px",
};

const AnomalyList = ({anomalies, selectedAnomalyPair, onAnomalyPairSelected}) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const onSearchChanged = (search) => {
    setSearch(search);
  }
  const list = useMemo(() => {
    const reasons = Object.keys(anomalies.reason);
    const filtered = reasons.filter((feature) => {
      const str = `${feature} - ${anomalies.reason[feature]}`;
      return !search || str.includes(search);
    });
    return filtered;
  }, [search, anomalies]);

  const renderRow = ({index}) => {
    const feature1 = list[index];
    const feature2 = anomalies.reason[feature1];
    return (
      <>
        <ListItem 
            button 
            key={index}
            classes={classes.listitem}
            selected={feature1 === selectedAnomalyPair[0]}
            onClick={() => onAnomalyPairSelected([feature1, feature2])}>
          <ListItemAvatar>
              <ErrorIcon style={{color: "lightcoral"}} />
          </ListItemAvatar>
          <ListItemText
            className={classes.item}
            primary={feature1}
            secondary={feature2}/>
        </ListItem>
        <Divider light />
      </>
    );
  };

  return (
    <div>
      <SearchBar 
        label="Anomaly List"
        onSearchChanged={onSearchChanged} />
      <FixedSizeList 
        style={listStyle}
        height={200} 
        width={300} 
        itemSize={50} 
        itemCount={list.length}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default AnomalyList;