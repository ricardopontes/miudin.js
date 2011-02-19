/*
Criado por Ricardo Pontes (@ricardopontes)
Email: chuck.info@gmail.com
*/

CmdUtils.CreateCommand({
  names: ["miudin", "miud.in", "miud"],
  arguments: noun_type_url,
  icon: 'http://miud.in/images/miudico.ico',
  description: ("Encurte sua URL com o Miud.in"),
  preview: function(pblock, {object: {text}}){
    if (!text) {
      pblock.innerHTML = this.description;
      return;
    }
    var shortener = this;
    pblock.innerHTML = _("Encurtando caminhos para...");
    CmdUtils.previewGet(pblock, this._api(text), function(miudin) {
      if(miudin !== "Error")
        pblock.innerHTML = _("Url encurtada <b>${miudin}</b>.",
                             {miudin:shortener._link(miudin)});
    });
  },
  execute: function(args) {
    var shortener = this;
    jQuery.get(this._api(args.object.text), function(miudin) {
      CmdUtils.setSelection(shortener._link(miudin), {text: miudin});
      Utils.clipboard.text = miudin;
    });
  },
  _api: function(url)("http://miud.in/api-create.php?url=" +
encodeURIComponent(url)),
  _link: function(url) {
    var conteudo = Utils.escapeHtml(url);
    return conteudo.link(conteudo);
  },
});
