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
      {required this.action,
      required this.reaction,
      required this.interval,
      required this.name});

  factory Area.fromJson({required dynamic json}) {
    return Area(
        action: CustomAction.fromJson(json: json),
        reaction: Reaction.fromJson(json: json),
        interval: json["interval"],
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
        action: CustomAction(config: ["Error"], name: "Error"),
        reaction: Reaction(config: ["Error"], name: "Error"),
        interval: "Error",
        name: "Error");
  }

  void clean() {
    action.clean();
    reaction.clean();
  }
}
