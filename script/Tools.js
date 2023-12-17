const Tools = {
    'GetNode':(ElementKey,keyType='id')=>keyType==='id'?document.getElementById(ElementKey):document.querySelector(ElementKey),
    'addListener':(element,event,func)=>element.addEventListener(event,func,false),
    'MiERu':(Node,YN=true)=>{
        let Mi = YN ? 'visible':'hidden';
        let seeing = Klee => Klee.style.visibility = Mi;
        if (Array.isArray(Node)){Node.forEach(Eula=>seeing(Eula))}else{seeing(Node)}
    },
    'GrabNum':ElementId => document.getElementById(ElementId).value === '' ? 0 : Number.isNaN(Number(document.getElementById(ElementId).value))?document.getElementById(ElementId).value:Number(document.getElementById(ElementId).value),
    'EnterFunc':(ParentId,ButtonId)=>{
        document.getElementById(ParentId).addEventListener('keydown',function(FiredKey){
        if(FiredKey.key==='Enter'&&!FiredKey.ctrlKey){document.getElementById(ButtonId).click()}},false)
    },
    'CopyMyText':function(TextToCopy='',CopyNode=undefined){
        try{
            let CopyZone;
            if (CopyNode===undefined){
                CopyZone = document.createElement('div');
                CopyZone.textContent = TextToCopy===''?this.textContent:TextToCopy;
                document.querySelector('body').appendChild(CopyZone);
            }else{
                CopyZone = CopyNode;
            }
            let Range = document.createRange();
            Range.selectNode(CopyZone);            
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(Range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            if(CopyNode===undefined){CopyZone.remove()}
            Tools['PopMsg'].call(this,'Copied');
            return Promise.resolve('resolve');
        }catch(error){
            return Promise.reject(error);
        }
    },
    'PopMsg':function(Message){
        const PopoutText = document.createElement('div');
        PopoutText.setAttribute('id','CopiedMessage');
        PopoutText.textContent = Message;
        this.after(PopoutText);
        PopoutText.style.top = this.offsetTop + this.offsetHeight + 10 + 'px';
        PopoutText.style.left = this.offsetLeft + 'px';
        PopoutText.style.zIndex = 10;
        setTimeout(()=>{
            let Text = Tools.GetNode('CopiedMessage');
            Text.remove();
        },1000)
    },
    'GetSheetData':function(RequestType,DataToAppend={},URL){
        let FormToFetch = new FormData();
        if(RequestType===undefined){return Promise.reject('ReQuestType undefined.')}else{FormToFetch.append('ReQuestType',RequestType)}
        Object.keys(DataToAppend).forEach(DataName=>FormToFetch.append(DataName,DataToAppend[DataName]));
        const fetchOptions = {'method':'POST','body':FormToFetch};
        return fetch(URL,fetchOptions);
    },
    'LabelTitle':(CheckBox,Label)=>{
        CheckBox.addEventListener('change',function(){
            const LabelTitle = CheckBox.checked?'點選以顯示':'點選以隱藏';
            Label.setAttribute('title',LabelTitle);
        },false);
    },
    'WaitPromise': (Amber)=> Amber==null?new Promise(resolve=>setTimeout(resolve,250)):Promise.resolve('resolve'),
    'NavBar':(Lists)=>{//Lists{List{title:{Attribute:value}]}
        const NavBar = document.querySelector('nav');
        Object.keys(Lists).forEach(List=>{
            const Stdiv = NavBar.appendChild(document.createElement('div'));
            const Title = Stdiv.appendChild(document.createElement('b'));
            Title.appendChild(document.createElement('div'))
            Title.querySelector('div').textContent = List;
            const LinkDiv = Stdiv.appendChild(document.createElement('div'));
            Object.keys(Lists[List]).forEach(Title=>{
                const ATag = LinkDiv.appendChild(document.createElement('a'));
                Lists[List][Title].target =Lists[List][Title].target===undefined?'_blank':Lists[List][Title].target;
                Object.keys(Lists[List][Title]).forEach(Attribute=>ATag.setAttribute(Attribute,Lists[List][Title][Attribute]));
                ATag.appendChild(document.createElement('div')).textContent = Title;
            });
        });
    },
    'ObjCompare':(ObjA,ObjB)=>{
        let CompareOutput = [,];
        const Objkeys = Amber=>Object.keys(Amber);
        const IsValueObj = Obj=>Object.keys(Obj).every(Amber=>typeof Obj[Amber]==='object');        
        if(Objkeys(ObjA).length!==Objkeys(ObjB).length){
            CompareOutput[0]=false;
            CompareOutput[1]='key length';
        }else if(IsValueObj(ObjA)||IsValueObj(ObjB)){
            CompareOutput[0]=false;
            CompareOutput[1]='valueObj';
        }else{
            CompareOutput[0] = Objkeys(ObjA).every(Amber=>ObjA[Amber]===ObjB[Amber]);
            CompareOutput[1] = CompareOutput[0]?null:Objkeys(ObjA).filter(Amber=>ObjA[Amber]!==ObjB[Amber]);
        }
        return CompareOutput;
    }
};