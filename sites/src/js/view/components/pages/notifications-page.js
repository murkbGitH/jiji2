import React                   from "react"

import AbstractPage            from "./abstract-page"
import NotificationList        from "../notifications/notification-list"
import NotificationListMenuBar from "../notifications/notification-list-menu-bar"
import NotificationDetailsView from "../notifications/notification-details-view"

import Card from "material-ui/Card"

export default class NotificationsPage extends AbstractPage {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const model = this.model();
    model.initialize(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.model().selection.selectedId = nextProps.params.id;
  }

  render() {
    return (
      <div className="notifications-page page">
        <Card className="main-card">
          <div className="list-panel">
            <NotificationListMenuBar
              model={this.model().notificationsTable}
              />
            <NotificationList
              model={this.model().notificationsTable}
              selectionModel={this.model().selection}
              autoFill={false}
              emptyLabel="通知はありません"
              selectable={true} />
          </div>
          <div className="details-panel">
            <NotificationDetailsView
              model={this.model().selection}
              chartModel={this.model().chart}
            />
          </div>
        </Card>
      </div>
    );
  }

  model() {
    return this.context.application.notificationsPageModel;
  }
}
NotificationsPage.contextTypes = {
  application: React.PropTypes.object.isRequired,
  router: React.PropTypes.object
};
