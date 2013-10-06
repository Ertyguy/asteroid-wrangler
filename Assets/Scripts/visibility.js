#pragma strict

public function Show()
{
	Show(this.gameObject);
}

public function Show(go: GameObject)
{
    go.SetActive(true);
	
    //Show all children
    for(var i=0; i<go.transform.childCount; i++)
    {
        Show(go.transform.GetChild(i).gameObject);        
    }
}

    
public function Hide()
{
	Hide(this.gameObject);
}

public function Hide(go: GameObject)
{
    //Hide all children
    for(var i=0; i<go.transform.childCount; i++)
    {
        Hide(go.transform.GetChild(i).gameObject);         
    }

    go.SetActive(false);
}