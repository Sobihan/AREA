import 'package:area/Models/action.dart';
import 'package:area/Models/reaction.dart';

class Area {
  String name;
  CustomAction action;
  Reaction reaction;
  String interval;
  String token = "";
  bool runNow = true;
  Area(
      {required this.token,
      required this.action,
      required this.reaction,
      required this.interval,
      required this.name,
      required this.runNow});

  factory Area.fromJson({required dynamic json}) {
    return Area(
        runNow: !json['is_stoped'],
        token: json["jobToken"],
        action: CustomAction.fromJson(json: json),
        reaction: Reaction.fromJson(json: json),
        interval: json["interval"].toString(),
        name: json["name"]);
  }
  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      "name": name,
      "Action": action.toString(),
      "Reaction": reaction.toString(),
      "Interval": interval.toString()
    };
    return data.toString();
  }

  factory Area.error() {
    return Area(
        runNow: false,
        token: "Error",
        action: CustomAction(config: ["Error"], name: "Error"),
        reaction: Reaction(config: ["Error"], name: "Error"),
        interval: "Error",
        name: "Error");
  }

  void clean() {
    action.clean();
    reaction.clean();
  }

  bool isError() {
    if (name == "Error" && action.name == "Error" && reaction.name == "Error") {
      return true;
    }
    return false;
  }
}
