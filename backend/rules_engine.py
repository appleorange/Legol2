import json
from typing import Dict, List, Any
from datetime import datetime, timedelta

class RulesEngine:
    """Matches extracted facts against hardcoded rules"""
    
    def __init__(self, rules_file: str = "rules.json"):
        with open(rules_file, 'r') as f:
            self.data = json.load(f)
        self.rules = self.data.get("rules", [])
    
    def matches_condition(self, condition: Dict, facts: Dict) -> bool:
        """Check if a rule's condition matches the given facts"""
        for key, value in condition.items():
            if key not in facts:
                return False
            
            fact_value = facts[key]
            
            # Simple equality
            if isinstance(value, (str, int, bool)):
                if fact_value != value:
                    return False
            
            # Complex comparison (e.g., {"gt": 5})
            elif isinstance(value, dict):
                if "gt" in value:
                    if not (fact_value > value["gt"]):
                        return False
                if "lt" in value:
                    if not (fact_value < value["lt"]):
                        return False
        
        return True
    
    def find_applicable_rules(self, facts: Dict) -> List[Dict]:
        """Find all rules that apply to these facts"""
        applicable = []
        for rule in self.rules:
            if self.matches_condition(rule.get("condition", {}), facts):
                applicable.append(rule)
        return applicable
    
    def build_dependency_graph(self, facts: Dict) -> Dict:
        """Build a graph of rule dependencies"""
        applicable_rules = self.find_applicable_rules(facts)
        nodes = []
        edges = []
        visited = set()
        
        def add_rule(rule_id, depth=0):
            if rule_id in visited:
                return
            visited.add(rule_id)
            
            rule = next((r for r in self.rules if r["id"] == rule_id), None)
            if not rule:
                return
            
            nodes.append({
                "id": rule_id,
                "label": rule["name"],
                "type": "rule",
                "source": rule.get("source", "Unknown"),
                "source_url": rule.get("source_url", ""),
                "deadline": rule.get("deadline_description", ""),
                "depth": depth
            })
            
            for dep in rule.get("depends_on", []):
                edges.append({"from": dep, "to": rule_id, "type": "dependency"})
                add_rule(dep, depth + 1)
        
        for rule in applicable_rules:
            add_rule(rule["id"])
        
        return {"nodes": nodes, "edges": edges}
    
    def extract_timeline(self, facts: Dict) -> List[Dict]:
        """Extract timeline from facts"""
        timeline = []
        applicable_rules = self.find_applicable_rules(facts)
        
        # If we have a military notice date, use it as reference
        if "military_notice_date" in facts:
            try:
                notice_date = datetime.strptime(facts["military_notice_date"], "%Y-%m-%d")
                
                timeline.append({
                    "date": notice_date.strftime("%Y-%m-%d"),
                    "event": "Military Notice Received",
                    "source": "military_notice"
                })
                
                # Add deadline-based events
                for rule in applicable_rules:
                    deadline_days = rule.get("deadline_days")
                    if deadline_days:
                        deadline_date = notice_date + timedelta(days=deadline_days)
                        timeline.append({
                            "date": deadline_date.strftime("%Y-%m-%d"),
                            "event": rule["name"],
                            "deadline": rule.get("deadline_description", ""),
                            "source": rule.get("source", "")
                        })
            except:
                pass
        
        # Sort timeline
        timeline.sort(key=lambda x: x["date"])
        return timeline