import React  from "react"
import Router from "react-router"
import MUI    from "material-ui"

const List         = MUI.List;
const ListItem     = MUI.ListItem;
const RaisedButton = MUI.RaisedButton;

export default class BacktestList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sources :    []
    };
  }

  componentWillMount() {
    const backtests = this.backtests();
    ["loaded", "added", "updated", "removed", "updateStates"].forEach(
      (e) => backtests.addObserver(e, this.onSourcesChanged.bind(this), this)
    );

    backtests.load();
  }
  componentWillUnmount() {
    this.backtests().removeAllObservers(this);
  }

  render() {
    const items = this.state.sources.map(
      (source) => this.createItemcomponent(source));
    const buttonAction = () => this.editor().newSourceFile();
    return (
      <div className="backtest-list">
        <div className="list">
          <List>{items}</List>
        </div>
      </div>
    );
  }

  createItemcomponent(backtest) {
    const tapAction = (e) => this.onItemTapped(e, backtest);
    const selected  = this.param.selectedId === backtest.id;
    return (
      <ListItem
        key={backtest.id}
        className={selected ? "mui-selected" : ""}
        onTouchTap={tapAction}>
        {backtest.name}
      </ListItem>
    );
  }

  onSourcesChanged(k, ev) {
    this.setState({sources:this.backtests().tests});
  }

  onItemTapped(e, source) {
    // TODO
  }

  backtests() {
    return this.context.application.backtests;
  }
}
BacktestList.contextTypes = {
  application: React.PropTypes.object.isRequired
};
